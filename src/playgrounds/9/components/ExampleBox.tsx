import React from "react";

import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { ChevronRight } from "@app/components/Icons";

const ExampleBox = ({ elevation }: { elevation: number }) => (
  <div className="container container--md">
    <Box elevation={elevation}>
      <h1>Customer Requests</h1>
      <p>Track and manage customer requests alongside your team's work</p>
      <footer>
        <Button variant="primary">Open views</Button>
        <Button variant="secondary">
          Learn more{" "}
          <ChevronRight width={15} height={15} stroke="currentColor" />
        </Button>
      </footer>
    </Box>
  </div>
);

export { ExampleBox };
