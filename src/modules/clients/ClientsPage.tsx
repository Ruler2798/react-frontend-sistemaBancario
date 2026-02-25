import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  message,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { Client } from "./types";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../../api/clientService";

const { Title } = Typography;

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form] = Form.useForm();

  const fetchClients = async () => {
    const res = await getClients();
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async () => {
  const values = await form.validateFields();
  console.log("EDITING:", editing);

  try {
    if (editing?.id) {
      await updateClient(editing.id, values);
      message.success("Cliente actualizado");
    } else {
      await createClient(values);
      message.success("Cliente creado correctamente");
    }

    setOpen(false);
    form.resetFields();
    fetchClients();
  } catch (error) {
    console.error(error);
    message.error("Error al guardar el cliente");
  }
};

const handleDelete = (id: number) => {
  Modal.confirm({
    title: "¿Eliminar cliente?",
    content: "Esta acción no se puede deshacer.",
    okText: "Sí, eliminar",
    okType: "danger",
    cancelText: "Cancelar",
    onOk: async () => {
      try {
        await deleteClient(id);
        message.success("Cliente eliminado correctamente");
        fetchClients();
      } catch (error) {
        message.error("Error al eliminar el cliente");
      }
    },
  });
};
  const columns = [
  { 
    title: "Nombre", 
    dataIndex: "nombre",
    key: "nombre",
    width: 120,
    responsive: ["xs", "sm", "md", "lg", "xl"] as any,
  },
  { 
    title: "Apellido", 
    dataIndex: "apellido",
    key: "apellido",
    width: 120,
    responsive: ["sm", "md", "lg", "xl"] as any,
  },
  { 
    title: "Correo", 
    dataIndex: "correo",
    key: "correo",
    width: 180,
    responsive: ["md", "lg", "xl"] as any,
  },
  { 
    title: "Teléfono", 
    dataIndex: "telefono",
    key: "telefono",
    width: 110,
    responsive: ["lg", "xl"] as any,
  },
  {
    title: "Fecha Registro",
    dataIndex: "fechaRegistro",
    key: "fechaRegistro",
    width: 140,
    responsive: ["xl"] as any,
    render: (fecha: string) => fecha ? dayjs(fecha).format("DD/MM/YYYY HH:mm") : "-",
  },
  {
    title: "Acciones",
    key: "acciones",
    fixed: "right" as any,
    width: 200,
    render: (_: any, record: Client) => (
      <Space size="small">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => {
            setEditing(record);

            form.setFieldsValue({
              nombre: record.nombre,
              apellido: record.apellido,
              identificacion: record.identificacion,
              telefono: record.telefono,
              correo: record.correo,
            });

            setOpen(true);
          }}
        >
          Editar
        </Button>

        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDelete(record.id!)}
        >
          Eliminar
        </Button>
      </Space>
    ),
  },
];

  return (
    <div style={{ padding: "16px" }}>
      <Card
        title={<Title level={3} style={{ margin: 0 }}>Gestión de Clientes</Title>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditing(null);
              form.resetFields();
              setOpen(true);
            }}
          >
            Nuevo Cliente
          </Button>
        }
        bodyStyle={{ padding: "0" }}
      >
        <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={clients}
          scroll={{ x: 600 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} clientes`,
            responsive: true,
          }}
        />

      <Modal
  title={editing ? "Editar Cliente" : "Nuevo Cliente"}
  open={open}
  onOk={handleSubmit}
  onCancel={() => {
    setOpen(false);
    setEditing(null);
    form.resetFields();
  }}
  okText={editing ? "Actualizar" : "Guardar"}
>
       <Form form={form} layout="vertical">
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: "Ingrese el nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="apellido"
          label="Apellido"
          rules={[{ required: true, message: "Ingrese el apellido" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="identificacion"
          label="Identificación"
          rules={[{ required: true, message: "Ingrese la identificación" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="telefono"
          label="Teléfono"
          rules={[{ required: true, message: "Ingrese el teléfono" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="correo"
          label="Correo"
          rules={[{ required: true, message: "Ingrese el correo" }]}
        >
          <Input />
        </Form.Item>
      </Form>
      </Modal>
    </Card>
    </div>
  );
};

export default ClientsPage;