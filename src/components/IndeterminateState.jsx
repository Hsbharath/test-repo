import { useState, useEffect, useRef } from "react";

const dataSet = [
  {
    id: 'electronics',
    label: 'Electronics',
    children: [
      {
        id: 'phones',
        label: 'Phones',
        children: [
          { id: 'iphone', label: 'iPhone', checked: false },
          { id: 'android', label: 'Android', checked: false },
        ],
      },
      {
        id: 'laptops',
        label: 'Laptops',
        children: [
          { id: 'macbook', label: 'MacBook', checked: false },
          { id: 'windows', label: 'Windows', checked: false },
        ],
      },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    children: [
      { id: 'mens', label: "Men's", checked: false },
      { id: 'womens', label: "Women's", checked: false },
    ],
  },
];

// Helper 1: Recursively toggles ALL nodes beneath a target node to a true/false value
const toggleAllChildren = (nodes, checkedValue) => {
  return nodes.map((node) => {
    const updatedNode = { ...node, checked: checkedValue };
    if (node.children) {
      updatedNode.children = toggleAllChildren(node.children, checkedValue);
    }
    return updatedNode;
  });
};

// Helper 2: Recursively traverses the tree to find the clicked ID and flips its state
const updateTreeNodes = (nodes, targetId, nextCheckedValue = null) => {
  return nodes.map((node) => {
    if (node.id === targetId) {
      // If nextCheckedValue is passed, we force it (parent toggle). Otherwise, we flip it (leaf click).
      const isChecked = nextCheckedValue !== null ? nextCheckedValue : !node.checked;
      return {
        ...node,
        checked: isChecked,
        children: node.children ? toggleAllChildren(node.children, isChecked) : undefined,
      };
    }

    if (node.children) {
      const updatedChildren = updateTreeNodes(node.children, targetId, nextCheckedValue);
      
      // Post-order evaluation: Re-calculate this parent's checkmark status based on its updated children
      const allChecked = updatedChildren.every((child) => child.checked);
      return {
        ...node,
        checked: allChecked,
        children: updatedChildren,
      };
    }

    return node;
  });
};

// 1. RECURSIVE CHILD COMPONENT: Renders a node and recursively calls itself for any sub-children
const TreeNode = ({ node, onToggle }) => {
  const checkboxRef = useRef(null);
  const hasChildren = node.children && node.children.length > 0;

  // Helper 3: Recursively collects the explicit checkmark states of all deep leaf nodes underneath this item
  const getLeafCheckStates = (item) => {
    if (!item.children || item.children.length === 0) {
      return [item.checked];
    }
    return item.children.flatMap(getLeafCheckStates);
  };

  // Determine indeterminate status dynamically on every single render cycle
  let isChecked = node.checked;
  let isIndeterminate = false;

  if (hasChildren) {
    const leafStates = getLeafCheckStates(node);
    const checkedLeaves = leafStates.filter(Boolean).length;
    
    isChecked = checkedLeaves === leafStates.length;
    isIndeterminate = checkedLeaves > 0 && checkedLeaves < leafStates.length;
  }

  // Update DOM properties directly via our specific ref pointer
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleCheckboxChange = () => {
    // If it's a parent node, we toggle based on its current *calculated* checkbox state
    const nextValue = hasChildren ? !isChecked : !node.checked;
    onToggle(node.id, nextValue);
  };

  return (
    <li style={{ margin: "6px 0", listStyleType: "none" }}>
      <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span style={{ marginLeft: "6px", fontWeight: hasChildren ? "bold" : "normal" }}>
          {node.label}
        </span>
      </label>

      {hasChildren && (
        <ul style={{ paddingLeft: "20px", marginTop: "4px", borderLeft: "1px dashed #ccc" }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </li>
  );
};

// 2. MAIN CONTAINER COMPONENT
const IndeterminateState = () => {
  const [treeData, setTreeData] = useState(dataSet);

  const handleToggle = (id, forceCheckedValue) => {
    setTreeData((prevTree) => updateTreeNodes(prevTree, id, forceCheckedValue));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
      <h3>Nested Category Manager</h3>
      <ul style={{ paddingLeft: 0 }}>
        {treeData.map((rootNode) => (
          <TreeNode key={rootNode.id} node={rootNode} onToggle={handleToggle} />
        ))}
      </ul>
    </div>
  );
};

export default IndeterminateState;
