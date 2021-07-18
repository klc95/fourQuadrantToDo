import './index.less';
import React, { useEffect, useState } from 'react'
import Locker from '../Locker'
function insertAfter(newElement: any, targetElement: any) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

function createToDoRes(title: string) {
  fetch('http://localhost:8000/todo', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `title=${title}`
  })
  .then(response => response.json())
  .then(json => console.log(json))
} 

function updateToDoRes(id: number, title: string, completed: boolean ) {
  fetch(`http://localhost:8000/todo/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `title=${title}&completed=${completed}`
  })
  .then(response => response.json())
  .then(json => console.log(json))
} 

function deleteToDoRes(id: number) {
  fetch(`http://localhost:8000/todo/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(json => console.log(json))
} 

function getTodoRes(title: string) {
  alert(`${title}`)
}



export default function Quadrant(props: any) {
  const [value, setValue] = useState('');
  const [grouplist, setgrouplist] = useState<any>([]);
  

  const handleOnChange = (e: any) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    fetch('http://localhost:8000/todo/list')
      .then(response => response.json())
      .then(json => setgrouplist(json.data))
  }, [])

  const handleOnKeyPress = (e: any) => {
    if (e.which === 13) {
      const obj = {
        title: value,
        completed: false
      }
      setgrouplist([...grouplist, obj])
      createToDoRes(value)
    }
  }

  const handleCompleted = (index: any) => {
    const newGroupList = [...grouplist]
    const todo = newGroupList[index];
    todo.completed = !todo.completed;
    setgrouplist(newGroupList);
    updateToDoRes(todo.id, todo.title, todo.completed)
  }

  const handleRemove = (index: number) => {
    const newGroupList = [...grouplist]
    const id = newGroupList[index].id
    newGroupList.splice(index, 1)
    setgrouplist(newGroupList)
    deleteToDoRes(id)
  }

  const handleOnClick = (index: number) => {
    const newGroupList = [...grouplist];
    const todo = newGroupList[index];
    getTodoRes(todo.title)
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

  const handleOnDrop = (event: any) => {
    event.preventDefault();
    var data = event.dataTransfer.getData('id');

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
      <div className="Quadrant_nav">
        <div className="Quadrant_bar">
          <div className="Quadrant_title">ToDoList</div>
          <input type="text"
            className="Quadrant_import"
            value={value}
            placeholder={'添加ToDo'}
            onChange={handleOnChange}
            onKeyPress={handleOnKeyPress} />
        </div>
      </div>

      <div className='Quadrant_importance'>重要</div>
      <div className='Quadrant_wrapper'>
        <div className='Quadrant_urgent'>不紧急</div>
        <div className='Quadrant_group'>
          <div className='Quadrant_item Quadrant_second' onDrop={handleOnDrop} onDragOver={allowDrop}></div>
          <div className='Quadrant_item Quadrant_first' onDrop={handleOnDrop} onDragOver={allowDrop}></div>
          <div className='Quadrant_item Quadrant_third' onDrop={handleOnDrop} onDragOver={allowDrop}>
            {grouplist.map((item: any, index: number) => (
              <div className="Quadrant_items-1"  onClick={() => handleOnClick(index)} style={item.completed ? { display: "none" } : {}}
                id={`drag_${index}`} draggable={true} onDragStart={drag} onDrop={drop}
                onDragOver={allowDrop}>
                <input className="Quadrant_box-1"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCompleted(index)} />
                {item.title}
                <div className="Quadrant_remove" onClick={() => handleRemove(index)}></div>
              </div>
            ))}
          </div>

          <div className='Quadrant_item Quadrant_fourth' onDrop={handleOnDrop} onDragOver={allowDrop}>

          </div>
        </div>
        <div className='Quadrant_urgent'>紧急</div>
      </div>
      <div className='Quadrant_unImportance'>不重要</div>

      <div className="Quadrant_main">
        <div className="Quadrant_done">
          <div className="Quadrant_title-1">已经完成</div>
          <div className="Quadrant_count">{newArr.length}</div>
        </div>
        <div className="Quadrant_doneitems">
          {grouplist.map((item: any, index: number) => (
            <div className="Quadrant_items-2" style={item.completed ? {} : { display: "none" }}
              id={`drag_${index}`} draggable={true} onDragStart={drag} onDrop={drop}
              onDragOver={allowDrop}>
              <input className="Quadrant_box-2"
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCompleted(index)} />
              {item.title}
              <div className="Quadrant_remove" onClick={() => handleRemove(index)}></div>
            </div>
          ))}
        </div>
      </div>
      <Locker />
    </div>
  );
}
