import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders kanban app tabs", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "在庫管理MVP" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "在庫ボード" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "買い物リスト" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "管理" })).toBeInTheDocument();
});
