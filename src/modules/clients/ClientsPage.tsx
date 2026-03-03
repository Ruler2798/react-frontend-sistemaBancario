import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
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

  // ✅ Cargar clientes
  const fetchClients = async () => {
    try {
      const res = await getClients();

      console.log("Respuesta backend:", res.data);

      if (Array.isArray(res.data)) {
        setClients(res.data);
      } else {
        console.error("El backend no devolvió un array:", res.data);
        setClients([]);
        message.error("Formato de datos incorrecto");
      }
    } catch (error) {
      console.error("Error completo:", error);
      message.error("Error al conectar con el backend");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ✅ Guardar (crear / actualizar)
  const handleSubmit = async () => {
    const values = await form.validateFields();

    try {
      if (editing?.id) {
        await updateClient(editing.id, values);
        message.success("Cliente actualizado correctamente");
      } else {
        await createClient(values);
        message.success("Cliente creado correctamente");
      }

      setOpen(false);
      setEditing(null);
      form.resetFields();
      fetchClients();
    } catch (error) {
      console.error(error);
      message.error("Error al guardar el cliente");
    }
  };

  // ✅ Eliminar
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
          console.error(error);
          message.error("Error al eliminar el cliente");
        }
      },
    });
  };

  // ✅ Columnas tabla
  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Apellido", dataIndex: "apellido", key: "apellido" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
    { title: "Teléfono", dataIndex: "telefono", key: "telefono" },
    {
      title: "Fecha Registro",
      dataIndex: "fechaRegistro",
      key: "fechaRegistro",
      render: (fecha: string) =>
        fecha ? dayjs(fecha).format("DD/MM/YYYY HH:mm") : "-",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: Client) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
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
    <div style={{ padding: 16 }}>
      <Card
        title={<Title level={3}>Gestión de Clientes</Title>}
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
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={clients}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (t) => `Total: ${t} clientes`,
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
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="apellido"
              label="Apellido"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="identificacion"
              label="Identificación"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="correo"
              label="Correo"
              rules={[{ required: true }]}
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