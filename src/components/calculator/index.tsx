import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Calculator() {
  const [result, setResult] = useState<string>("0");
  const [firstNum, setFirstNum] = useState<string>("");
  const [operator, setOperator] = useState<string>("");

  const handleNumClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const num: string = e.currentTarget.value;
    if (result === "0") {
      setResult(num);
    } else {
      setResult(result + num);
    }
  };

  const handleOperatorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const op: string = e.currentTarget.value;
    setFirstNum(result);
    setResult("0");
    setOperator(op);
  };

  const handleClearClick = () => {
    setResult("0");
    setFirstNum("");
    setOperator("");
  };

  const handleEqualClick = () => {
    const secondNum: string = result;
    let res: string = "";
    switch (operator) {
      case "+":
        res = (Number(firstNum) + Number(secondNum)).toString();
        break;
      case "-":
        res = (Number(firstNum) - Number(secondNum)).toString();
        break;
      case "*":
        res = (Number(firstNum) * Number(secondNum)).toString();
        break;
      case "/":
        res = (Number(firstNum) / Number(secondNum)).toString();
        break;
      default:
        res = "0";
        break;
    }
    setResult(res);
    setFirstNum("");
    setOperator("");
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className="calculator">
        <div className="display">{result}</div>
        <div className="button-row">
          <button className="number-button" onClick={handleNumClick} value="1">
            1
          </button>
          <button className="number-button" onClick={handleNumClick} value="2">
            2
          </button>
          <button className="number-button" onClick={handleNumClick} value="3">
            3
          </button>
          <button
            className="operator-button"
            onClick={handleOperatorClick}
            value="+"
          >
            +
          </button>
        </div>
        <div className="button-row">
          <button className="number-button" onClick={handleNumClick} value="4">
            4
          </button>
          <button className="number-button" onClick={handleNumClick} value="5">
            5
          </button>
          <button className="number-button" onClick={handleNumClick} value="6">
            6
          </button>
          <button
            className="operator-button"
            onClick={handleOperatorClick}
            value="-"
          >
            -
          </button>
        </div>
        <div className="button-row">
          <button className="number-button" onClick={handleNumClick} value="7">
            7
          </button>
          <button className="number-button" onClick={handleNumClick} value="8">
            8
          </button>
          <button className="number-button" onClick={handleNumClick} value="9">
            9
          </button>
          <button
            className="operator-button"
            onClick={handleOperatorClick}
            value="*"
          >
            *
          </button>
        </div>
        <div className="button-row">
          <button className="clear-button" onClick={handleClearClick}>
            Clear
          </button>
          <button className="number-button" onClick={handleNumClick} value="0">
            0
          </button>
          <button className="equal-button" onClick={handleEqualClick}>
            =
          </button>
          <button
            className="operator-button"
            onClick={handleOperatorClick}
            value="/"
          >
            /
          </button>
        </div>
      </div>
    </main>
  );
}
