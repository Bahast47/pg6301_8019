import TestRenderer from "react-test-renderer";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { OrdersPage } from "../src/client/OrdersPage";

/*const orderApi = {
    listOrders: async () => [{ id: 1, travelFrom: "Oslo" }],
};

describe("order list page", () => {
    it("show orders", async () => {
        let view;
        await TestRenderer.act(async () => {
            view = TestRenderer.create(<OrdersPage orderApi={orderApi} />);
        });
        expect(view.toJSON()).toMatchSnapshot();
        expect(view.root.findByType("li").children[0]).toEqual("Oslo");
    });

    it("show order on dom", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(<OrdersPage orderApi={orderApi} />, container);
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual(
            "Oslo"
        );
    });
});

 */
