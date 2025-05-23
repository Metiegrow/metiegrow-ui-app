import axios from "axios";
import { NotificationManager } from "components/common/react-notifications";
import { baseUrl } from "constants/defaultValues";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  //   ListGroup,
  //   ListGroupItem,
  Row,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
// check

const MyWallet = () => {
  const [balance, setBalance] = useState(0);
  // const [transactionIdCounter, setTransactionIdCounter] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const url = `${baseUrl}/wallets`;
  // const url = `${baseUrl}/wallets`;
  const url1 = `${baseUrl}/api/transactions`;

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get(url1);
      const walletData = response.data;
      setBalance(walletData.newBalance);
      setTransactions(walletData.newTransactions);
    } catch (error) {
      console.error("Error while fetching data from the server", error);
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  // const updateBalance = async () => {
  //     try {
  //       const updatedBalance = {
  //         newBalance: balance
  //       };

  //       await axios.put(url1, updatedBalance);

  //     } catch (error) {
  //       console.error("Error updating profile", error);
  //     }
  //   };

  const postData = async (amount) => {
    const url2 = `${baseUrl}/api/paytm/makePayment?amount=${amount}`;
    try {
      setIsLoading(true);
      const response = await axios.post(url2);

      // console.log("recharge",response)

      // setTimeout(() => {
      fetchDataFromServer();
      // NotificationManager.success(response.data.statuses[0].message, 'Great!', 3000, null, null, '');
      response.data.statuses.forEach((status) => {
        NotificationManager.success(
          status.message,
          status.status,
          3000,
          null,
          null,
          ""
        );
      });
      setIsLoading(false);
      // }, 3000);
    } catch (error) {
      console.error("Error making payment", error);
      // setTimeout(() => {
      NotificationManager.warning(
        "Something went wrong",
        "Oops!",
        3000,
        null,
        null,
        ""
      );
      setIsLoading(false);
      // }, 3000);
    }
  };
  const handleRecharge = () => {
    const amount = parseFloat(rechargeAmount);
    // console.log("rech", amount)

    // if (!Number.isNaN(amount) && amount > 0) {
    //   const newBalance = balance + amount;
    //   const newTransactions = {
    //     id: transactionIdCounter,
    //     type: "Recharge",
    //     amount,
    //     status: "Success",
    //     paymentmethod: "UPI",
    //     date: new Date(),
    //   };

    //   setBalance(newBalance);
    //   setTransactions((prevTransactions) => [
    //     newTransactions,
    //     ...prevTransactions,
    // ]);
    //   setTransactionIdCounter((prevCounter) => prevCounter + 1);
    setRechargeAmount("");
    //   updateBalance()

    postData(amount);
  };

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    // handleRecharge();
  };

  const handleAmountButtonClick = (amount) => {
    setRechargeAmount((prevAmount) =>
      (parseFloat(prevAmount || 0) + amount).toString()
    );
  };

  return (
    <Card className="mt-4">
      <Container className="p-4">
        <h1>
          Wallet Balance: <span className="font-weight-bold">₹{balance}</span>
        </h1>

        <Form onSubmit={handleRechargeSubmit} className="mb-3">
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
            <Input
              type="number"
              placeholder="Enter Amount"
              value={rechargeAmount}
              // onChange={(e) => setRechargeAmount(e.target.value)}
              onChange={({ target: { value } }) => {
                // Convert to a valid positive number string or empty value
                if (/^\d*$/.test(value)) {
                  setRechargeAmount(value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "+" || e.key === "e") {
                  e.preventDefault(); // Prevent these characters from being entered
                }
              }}
              className="col-12 col-md-3"
            />
          </InputGroup>
          <Row>
            <Button
              color="primary"
              outline
              className="mr-2 ml-4 mb-4"
              onClick={() => handleAmountButtonClick(500)}
            >
              + ₹500
            </Button>
            <Button
              color="primary"
              outline
              className="mr-2 mb-4"
              onClick={() => handleAmountButtonClick(1000)}
            >
              + ₹1000
            </Button>
            <Button
              color="primary"
              outline
              className="mb-4"
              onClick={() => handleAmountButtonClick(1500)}
            >
              + ₹1500
            </Button>
          </Row>
          <Button
            type="submit"
            color="primary"
            onClick={handleRecharge}
            className={`col-12 col-md-3 btn-shadow btn-multiple-state ${
              isLoading ? "show-spinner" : ""
            }`}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Add money to Wallet</span>
          </Button>
        </Form>

        <div className="mt-4">
          <h2>Recent Transactions</h2>
          {/* <ListGroup> */}
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="mb-4 p-2">
              <div className="d-flex flex-wrap">
                <div className="mr-2">
                  <strong>Transaction id:</strong> {transaction.id}
                </div>
                <div className="mr-2">
                  <strong>Amount:</strong> ₹{Math.abs(transaction.amount)}
                </div>
                <div className="mr-2">
                  <strong>Status:</strong> {transaction.status}
                </div>
                <div className=" mr-2">
                  <strong>Payment Method:</strong> {transaction.paymentmethod}
                </div>
                <div className=" mr-2">
                  <strong>Date:</strong>{" "}
                  <TimestampConverter
                    timeStamp={transaction.date}
                    format="datetime"
                  />
                </div>
                <div className="mr-2">
                  <strong>Description:</strong> {transaction.description}
                </div>
              </div>
            </Card>
          ))}
          {/* </ListGroup> */}
        </div>
      </Container>
    </Card>
  );
};

export default MyWallet;
