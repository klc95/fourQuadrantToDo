import React, { useState } from 'react'
import './index.less'

function insertAfter(newElement: any, targetElement: any) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
}

function Demo() {
    const [value, setValue] = useState('');
    const [placeholder, setPlaceholder] = useState('添加ToDo');
    const [grouplist, setgrouplist] = useState([{ text: 'react', completed: false }]);

    const handleOnChange = (e: any) => {
        setValue(
            e.target.value
        )
    }

    const handleOnKeyPress = (e: any) => {

        if (e.which === 13) {
            const obj = {
                text: value,
                completed: false
            }
            setgrouplist([...grouplist, obj])
        }
    }

    const handleCompleted = (index: any) => {
        const newGroupList = [...grouplist]
        console.log(newGroupList === grouplist)
        newGroupList[index].completed = !newGroupList[index].completed
        setgrouplist(newGroupList)
    }

    const handleRemove = (index: number) => {
        const newGroupList = [...grouplist]

        newGroupList.splice(index, 1)
        setgrouplist(newGroupList)
    }

    const allowDrop = (event: any) => {
        event.preventDefault();
    }

    const drag = (event: any) => {
        event.dataTransfer.setData('id', event.target.id);
    }

    const drop = (event: any) => {
        event.preventDefault();
        var data = event.dataTransfer.getData('id');
        insertAfter(document.getElementById(data), event.target)
    }




    const arr = [];
    const newArr = [];
    for (var i = 0; i <= grouplist.length - 1; i++) {
        if (grouplist[i].completed === false) {
            arr.push(grouplist[i])
        } else { newArr.push(grouplist[i]) }
    }

    return (
        <div>
            <div className="Demo_nav">
                <div className="Demo_bar">
                    <div className="Demo_title">ToDoList</div>
                    <input type="text"
                        className="Demo_import"
                        value={value}
                        placeholder={placeholder}
                        onChange={handleOnChange}
                        onKeyPress={handleOnKeyPress} />
                </div>
            </div>


            <div className="Demo_main">
                <div className="Demo_doing">
                    <div className="Demo_title-1">正在进行</div>
                    <div className="Demo_count">{arr.length}</div>
                </div>

                <div className="Demo_doingitems">
                    {grouplist.map((item, index) => (
                        <div className="Demo_items-1" style={item.completed ? { display: "none" } : {}}
                            id={`drag_${index}`} draggable={true} onDragStart={drag} onDrop={drop}
                            onDragOver={allowDrop}>
                            <input className="Demo_box-1"
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleCompleted(index)} />
                            {item.text}
                            <div className="Demo_remove" onClick={() => handleRemove(index)}></div>
                        </div>
                    ))}
                </div>

                <div className="Demo_done">
                    <div className="Demo_title-1">已经完成</div>
                    <div className="Demo_count">{newArr.length}</div>
                </div>
                <div className="Demo_doneitems">
                    {grouplist.map((item, index) => (
                        <div className="Demo_items-2" style={item.completed ? {} : { display: "none" }}
                            id={`drag_${index}`} draggable={true} onDragStart={drag} onDrop={drop}
                            onDragOver={allowDrop}>
                            <input className="Demo_box-2"
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleCompleted(index)} />
                            {item.text}
                            <div className="Demo_remove" onClick={() => handleRemove(index)}></div>
                        </div>
                    ))}
                </div>

                {/* <div className="Demo_tail"><div className="Demo_txt">Copyright © 2014 todolist.cn <span className="Demo_clear">clear</span></div></div> */}
            </div>

        </div>
    )
}

export default Demo