// Radix: https://github.com/radix-ui/primitives/tree/main/apps/storybook/stories
// Picsum: https://picsum.photos/id/1005/400/400

import React, { useState } from "react";

import "./styles.css";
import info from "./info.md";

import { MEMBERS } from "./const";
import { FullScreen } from "@app/components";
import { AddUser, ExternalLink } from "@app/components/Icons";

import { Box } from "./Components/Box";
import { Section } from "./Components/Section";
import { Text } from "./Components/Text";
import { Badge } from "./Components/Badge";
import { Input } from "./Components/Input";
import { Members } from "./Components/Members";
import { Member } from "./types";

const Playground = () => {
  const [members, setMembers] = useState<Member[]>(MEMBERS);

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
          <Input />
          <Members members={members} />
        </Section>
        <Section className="page-header">
          <Badge icon={<ExternalLink />} className="page-header-badge" />
        </Section>
      </Box>
    </FullScreen>
  );
};

export default Playground;
