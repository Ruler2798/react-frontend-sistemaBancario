import { useEffect, useState } from "react";
import { Card, Table } from "antd";
import type { Loan } from "./types";
import { getLoans } from "../../api/loanService";

const LoansPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchLoans = async () => {
    const res = await getLoans();
    setLoans(res.data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const columns = [
    {
      title: "Cliente",
      render: (_: any, record: Loan) =>
        `${record.cliente.nombre} ${record.cliente.apellido}`,
    },
    { title: "Monto", dataIndex: "monto" },
    { title: "Plazo (meses)", dataIndex: "plazoMeses" },
    { title: "Tasa %", dataIndex: "tasaInteres" },
    { title: "Fecha Inicio", dataIndex: "fechaInicio" },
  ];

  return (
    <Card title="Préstamos Activos">
      <Table rowKey="id" columns={columns} dataSource={loans} />
    </Card>
  );
};

export default LoansPage;