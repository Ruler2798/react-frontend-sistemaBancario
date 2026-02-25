import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  Select,
  Space,
  message,
  Tag,
  Popconfirm,
} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { LoanRequest } from "./types";
import type { Client } from "../clients/types";
import {
  getLoanRequests,
  createLoanRequest,
  approveLoanRequest,
  rejectLoanRequest,
} from "../../api/loanRequestService";
import { getClients } from "../../api/clientService";

const LoanRequestsPage = () => {
  const [requests, setRequests] = useState<LoanRequest[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const [reqRes, clientRes] = await Promise.all([
      getLoanRequests(),
      getClients(),
    ]);
    setRequests(reqRes.data);
    setClients(clientRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    try {
      await createLoanRequest(values);
      message.success("Solicitud creada correctamente");
      setOpen(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      message.error("Error al crear la solicitud");
    }
  };

  const columns = [
    {
      title: "Cliente",
      render: (_: any, record: LoanRequest) =>
        `${record.cliente?.nombre} ${record.cliente?.apellido}`,
    },
    { title: "Monto", dataIndex: "montoSolicitado" },
    { title: "Plazo (meses)", dataIndex: "plazoMeses" },
    { title: "Interés %", dataIndex: "tasaInteres" },
    {
      title: "Estado",
      dataIndex: "estado",
      render: (estado: string) => {
        const color =
          estado === "APROBADA"
            ? "green"
            : estado === "RECHAZADA"
            ? "red"
            : "gold";
        return <Tag color={color}>{estado}</Tag>;
      },
    },
    {
      title: "Acciones",
      render: (_: any, record: LoanRequest) =>
        record.estado === "PENDIENTE" && (
          <Space size="small">
            <Popconfirm
              title="¿Aprobar esta solicitud?"
              description="Esta acción creará un préstamo activo."
              onConfirm={async () => {
                await approveLoanRequest(record.id!);
                message.success("Solicitud aprobada");
                fetchData();
              }}
              okText="Sí, aprobar"
              cancelText="Cancelar"
            >
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              >
                Aprobar
              </Button>
            </Popconfirm>

            <Popconfirm
              title="¿Rechazar esta solicitud?"
              description="Esta acción no se puede deshacer."
              onConfirm={async () => {
                await rejectLoanRequest(record.id!);
                message.success("Solicitud rechazada");
                fetchData();
              }}
              okText="Sí, rechazar"
              okType="danger"
              cancelText="Cancelar"
            >
              <Button
                danger
                icon={<CloseCircleOutlined />}
                size="small"
              >
                Rechazar
              </Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  return (
    <Card
      title="Gestión de Solicitudes"
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Nueva Solicitud
        </Button>
      }
    >
      <Table rowKey="id" columns={columns} dataSource={requests} />

      <Modal
        title="Nueva Solicitud"
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="clienteId"
            label="Cliente"
            rules={[{ required: true }]}
          >
            <Select placeholder="Seleccione cliente">
              {clients.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.nombre} {c.apellido}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="montoSolicitado"
            label="Monto"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="plazoMeses"
            label="Plazo (meses)"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="tasaInteres"
            label="Tasa de Interés (%)"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default LoanRequestsPage;