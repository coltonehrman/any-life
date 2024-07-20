import { BankView } from "./bank.view.js";
import { CheckingView } from "./checking.view.js";
import { Money } from "../items/money.model.js";
import { SavingsView } from "./savings.view.js";
import express from "express";
import { getPlayerById } from "../player/players.data.js";

const bankView = new BankView();
const checkingView = new CheckingView();
const savingsView = new SavingsView();

export const bankRouter = express.Router();

bankRouter.get("/bank", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(bankView.print(player));
});

bankRouter.get("/bank/checking", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(checkingView.print(player));
});

bankRouter.post("/bank/checking/deposit", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const amount = Number(req.body.amount);

  if (!Number.isNaN(amount)) {
    const amountToDeposit = new Money({
      dollars: amount,
    });

    player.bank.checking.amount =
      player.bank.checking.amount.add(amountToDeposit);
    player.cash = player.cash.subtract(amountToDeposit);

    player.bank.checking.transactions.push({
      type: "Deposit",
      amount: amountToDeposit,
    });
  }

  return res.send(checkingView.print(player));
});

bankRouter.post("/bank/savings/deposit", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const amount = Number(req.body.amount);

  if (!Number.isNaN(amount)) {
    const amountToDeposit = new Money({
      dollars: amount,
    });

    player.bank.savings.amount =
      player.bank.savings.amount.add(amountToDeposit);
    player.cash = player.cash.subtract(amountToDeposit);

    player.bank.savings.transactions.push({
      type: "Deposit",
      amount: amountToDeposit,
    });
  }

  return res.send(checkingView.print(player));
});

bankRouter.get("/bank/savings", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(savingsView.print(player));
});
