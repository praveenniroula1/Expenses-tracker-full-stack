import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataAction,
  HandleOnDeleteActioned,
} from "../../pages/transaction/transactionAction";

export const TransactionTable = () => {
  const dispatch = useDispatch();

  const { transactions } = useSelector((state) => state.transactions);
  useEffect(() => {
    dispatch(fetchDataAction());
  }, []);

  return (
    <>
      <Table striped bordered hover className="hero-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Date</th>
            <th>Title</th>
            <th>Expenses</th>
            <th>Income</th>
            <th>Actioned</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.date}</td>
                <td>{item.title}</td>
                <td className="text-danger">
                  {item.type === "expenses" && "-" + item.amount}
                </td>

                <td className="text-success">
                  {item.type === "income" && +item.amount}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(HandleOnDeleteActioned(item._id))}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="text-end fw-bold">{}</div>
    </>
  );
};
