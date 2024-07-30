import React from "react";
import { Card } from "antd";

interface card {
  cardTitle: string;
  content: string;
  link?: string;
}

const App: React.FC<card> = ({ cardTitle, content, link }: card) => (
  <Card title="Flights">
    <Card type="inner" title={cardTitle} extra={<a href={link}>More</a>}>
      {content}
    </Card>
  </Card>
);

export default App;
