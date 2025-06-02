import React from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { AddUser, ExternalLink } from "@app/components/Icons";

import { Box } from "./Components/Box";
import { Button } from "./Components/Button";
import { Section } from "./Components/Section";
import { Text } from "./Components/Text";
import { Badge } from "./Components/Badge";

const Playground = () => {
  return (
    <FullScreen centerContent info={info}>
      <Box className="page">
        <Section className="page-header">
          <Badge icon={<AddUser />} className="page-header-badge" />
          <div className="page-header-titles">
            <Text variant="h1">Invite to Project</Text>
            <Text variant="h2">Collaborate with members on this project.</Text>
          </div>
        </Section>
        <Section>
          <Button>Test</Button>
        </Section>
        <Section className="page-header">
          <Badge icon={<ExternalLink />} className="page-header-badge" />
        </Section>
      </Box>
    </FullScreen>
  );
};

export default Playground;
