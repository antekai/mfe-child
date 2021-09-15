import { mountComponent, loadById, load } from "nova-react";
import Child from "./Child";
import "../global.css";

const render = (name, { node, data }) => {
  return mountComponent(Child, node, data);
};

document.addEventListener("NovaMount", ({ detail }: any) => {
  const { name, id } = detail;
  const payload = loadById(name, id);

  if (payload) {
    render(name, payload);
  }
});

load("child").forEach(render.bind(null, "child"));
