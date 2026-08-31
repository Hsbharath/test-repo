import React, { useState } from 'react'

const dataSet = [
  {
    id: 'electronics',
    label: 'Electronics',
    checked: false,
    children: [
      {
        id: 'phones',
        label: 'Phones',
        checked: false,
        children: [
          { id: 'iphone', label: 'iPhone', checked: false },
          { id: 'android', label: 'Android', checked: false },
        ],
      },
      {
        id: 'laptops',
        label: 'Laptops',
        checked: false,
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
    checked: false,
    children: [
      { id: 'mens', label: "Men's", checked: false },
      { id: 'womens', label: "Women's", checked: false },
    ],
  },
];

const ItemGroup = ({ item, onCheckboxChange }) => {
    return(
        <li>
            <input type="checkbox" checked={item.checked} onChange={() => onCheckboxChange(item.id)}/>
            <label>{item.label}</label>         
            {item.children && item.children.length > 0 && (
                <ul>
                    {item.children.map((child) => (
                        <ItemGroup key={child.id} item={child} onCheckboxChange={onCheckboxChange} />
                    ))}
                </ul>
            )}          
        </li>
    )
}

const NestedCheckboxes = () => {

    const [items, setItems] = useState(dataSet);

    const toggleChecked = (nodes, itemId, checkedValue = null) => {
        // return nodes.map((node) => {

        //     if(checkedValue !== null){
        //         return {
        //             ...node,
        //             checked: checkedValue,
        //             children: node.children ? toggleChecked(node.children, null, checkedValue) : [],
        //         };
        //     }

        //     if (node.id === itemId) {
        //         const newChecked = !node.checked;
        //         return {
        //             ...node,
        //             checked: newChecked,
        //             children: node.children ? toggleChecked(node.children, null, newChecked) : [],
        //         };
        //     }

        //     if(node.children){
        //         return {
        //             ...node,
        //             children: toggleChecked(node.children, itemId, null),
        //         };
        //     }

        //     return node;
        // })

        return nodes.map((node) => {

            if(checkedValue !== null){
                return {
                    ...node,
                    checked: checkedValue,
                    children: node.children ? toggleChecked(node.children, null, checkedValue) : []
                }
            }

            if(node.id === itemId){
                let newChecked = !node.checked;
                return {
                    ...node,
                    checked: newChecked,
                    children: toggleChecked(node.children, null, newChecked)
                }
            }

            if(node.children){
                return {
                    ...node,
                    children: toggleChecked(node.children, itemId, null)
                }
            }

            return node;
        })
    }

    const handleCheckboxChange = (itemId) => {
        // console.log('handleCheckboxChange', itemId);
        setItems((prevItems) =>  toggleChecked(prevItems, itemId));
    }

    const getCheckedItems = (nodes) => {

        let result = [];

        nodes.forEach(node => {
            if(node.checked){
                result.push(node.label);
            }
            if(node.children && node.children.length > 0){
                result = result.concat(getCheckedItems(node.children));
            }
        });

        return result;

    }

    const checkedLabels = getCheckedItems(items);

  return (
    <div>
        <ul>
        { items.map((item) => (
            <ItemGroup key={item.id} item={item} onCheckboxChange={handleCheckboxChange} />
        ))}
        </ul>
        <ul>
            {
                checkedLabels.map(label =>(
                    <p key={label}>{label}</p>
                ))
            }
        </ul>
    </div>
  )
}

export default NestedCheckboxes
