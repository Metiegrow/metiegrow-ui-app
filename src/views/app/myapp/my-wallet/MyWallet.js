import axios from "axios";
import { baseUrl } from "constants/defaultValues";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Input,
  InputGroupAddon,
  InputGroup,
  //   ListGroup,
  //   ListGroupItem,
  Row,
  Card,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
// check

const MyWallet = () => {
  const [balance, setBalance] = useState(0);
  // const [transactionIdCounter, setTransactionIdCounter] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [rechargeAmount, setRechargeAmount] = useState("");

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
      await axios.post(url2);
    fetchDataFromServer();

    } catch (error) {
      console.error("Error making payment", error);
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
    }
  

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
              onChange={(e) => setRechargeAmount(e.target.value)}
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
            className="col-12 col-md-3"
          >
            Add money to Wallet
          </Button>
        </Form>

        <div className="mt-4">
          <h2>Recent Transactions</h2>
          {/* <ListGroup> */}
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="mb-4 p-2">
              <div className="d-flex">
                <span className="mr-2">
                  <strong>Transaction id:</strong> {transaction.id}
                </span>
                
                <span className="mr-2">
                  <strong>Amount:</strong> ₹{Math.abs(transaction.amount)}
                </span>
                <span className="mr-2">
                  <strong>Status:</strong> {transaction.status}
                </span>
                <span className="mr-2">
                  <strong>Payment Method:</strong> {transaction.paymentmethod}
                </span>
                <span className="mr-2">
                  <strong>Date:</strong> <TimestampConverter timeStamp={transaction.date} format="datetime" />
                </span>
                <span className="mr-2">
                  <strong>Description:</strong>{" "}
                  {transaction.description}
                </span>
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
