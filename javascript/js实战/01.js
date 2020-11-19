const deserialize = (data) => {
  const list = data.split(","); // 按逗号split成数组

  const buildTree = (list) => {
    // dfs函数，构建当前子树
    const rootVal = list.shift(); // 弹出首项，获取它的“数据”
    if (rootVal == "X") {
      // 是X，返回null节点
      return null;
    }
    const root = new TreeNode(rootVal); // 不是X，则创建节点
    root.left = buildTree(list); // 递归构建左子树
    root.right = buildTree(list); // 递归构建右子树
    return root; // 返回当前构建好的子树
  };

  return buildTree(list); // 构建的入口
};
