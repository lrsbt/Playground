// Radix: https://github.com/radix-ui/primitives/tree/main/apps/storybook/stories
// Picsum: https://picsum.photos/id/1005/400/400

import React, { useState } from "react";

import "./styles.css";
import info from "./info.md";

import { MEMBERS } from "./const";
import { Member } from "./types";
import { FullScreen } from "@app/components";
import { AddUser, ChevronUp, ExternalLink } from "@app/components/Icons";

import { Box } from "./Components/Box";
import { Section } from "./Components/Section";
import { Text } from "./Components/Text";
import { Badge } from "./Components/Badge";
import { Input } from "./Components/Input";
import { Members } from "./Components/Members";

const Playground = () => {
  const [members, setMembers] = useState<Member[]>(MEMBERS);

  return (
    <FullScreen centerContent info={info}>
      <Box className="page">
        <Section className="header header--wide">
          <Badge icon={<AddUser />} />
          <div className="header-titles">
            <Text.H1>Invite to Project</Text.H1>
            <Text.H2>Collaborate with members on this project.</Text.H2>
          </div>
        </Section>

        <Section>
          <Input />
          <Members members={members} />
        </Section>

        <Section className="header header--tight">
          <Badge icon={<ExternalLink />} />
          <div className="header-titles">
            <Text.H1 size="xl" className="flex header-title">
              Members with link <ChevronUp />
            </Text.H1>
            <Text.P>
              Members who have the link have access to this project.
            </Text.P>
          </div>
        </Section>
      </Box>
    </FullScreen>
  );
};

export default Playground;
