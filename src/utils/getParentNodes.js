const targetData = {};
export function loops(data = [], parent) {
  return data.map(({ children, code2: value }) => {
    const node = {
      value,
      parent
    }
    targetData[value] = node;
    node.children = loops(children, node);
    return
  })
}
export function getNode(value) {
  let node = [];
  const currentNode = targetData[value];
  node.push(currentNode.value);
  if (currentNode.parent) {
    node = [...getNode(currentNode.parent.value), ...node];
  }
  return node
}
