import Layout from "@/app/todo/layout";
import {render, screen} from "@testing-library/react";

describe("layout component", () => {
  test("render layout component with correct structure", () => {
     render(<Layout />);
     // expect(screen.getByRole('heading', {level: 1}))
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('ToDos');
  });
});