export default function processMenu(menus, pid = 0) {
  const tree = [];
  for (const item of menus) {
    if (item.pid === pid) {
      const children = processMenu(menus, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }
  return tree;
}