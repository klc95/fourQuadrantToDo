import { useEffect, useState } from 'react';
import './index.less';



function moveArrayIndexAToIndexB(arr: any, indexA: number, indexB: number) {
  var temp = arr[indexA];
  for (var i = indexA; i < indexB; i++) {
    arr[i] = arr[i + 1]
  }
  arr[indexB] = temp
  return arr;
}

function createToDoRes(title: string, completed: boolean, place: string) {
  return fetch('http://localhost:8000/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `title=${title}&completed=${completed}&place=${place}`
  })
    .then(response => response.json())
    .then(json => json)
}

function updateToDoRes(id: number, title: string, completed: boolean, place: string) {
  fetch(`http://localhost:8000/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `title=${title}&completed=${completed}&place=${place}`
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

export default function Quadrant(props: any) {
  const [value, setValue] = useState('');
  const [group, setGroup] = useState<any>([]);

  const handleOnChange = (e: any) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    fetch('http://localhost:8000/todo/list')
      .then(response => response.json())
      .then(json => setGroup(json.data))
  }, [])

  const handleOnKeyPress = (e: any) => {
    if (e.which === 13) {
      createToDoRes(value, false, '3').then((json) => {
        const obj = {
          title: value,
          completed: false,
          place: '3',
          id: json.id
        }
        setGroup([...group, obj])
      })
      setValue('')
    }
  }

  const handleCompleted = (id: string) => {
    const newGroup = [...group];
    const index = newGroup.findIndex((item) => item.id === id);
    const todo = newGroup[index];
    todo.completed = !todo.completed;
    setGroup(newGroup);
    updateToDoRes(todo.id, todo.title, todo.completed, todo.place)
  }

  const handleRemove = (id: string) => {
    const newGroup = [...group]
    const index = newGroup.findIndex((item) => item.id === id)
    const ID = newGroup[index].id
    newGroup.splice(index, 1)
    setGroup(newGroup);
    deleteToDoRes(ID);
  }

  const allowDrop = (event: any) => {
    event.preventDefault();
  }

  const drag = (event: any) => {
    event.dataTransfer.setData('id', event.target.id);
  }

  const drop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    var data = event.dataTransfer.getData('id');
    const id = data.substring(5);
    const tar = event.target.id.substring(5);
    const newGroup = [...group];
    const index_1 = newGroup.findIndex((item: any) => item.id === id);
    const index_2 = newGroup.findIndex((item: any) => item.id === tar);
    moveArrayIndexAToIndexB(newGroup, index_1, index_2)
    setGroup(newGroup)
    console.log(data, 'data', event.target.id)
  }

  const handleOnDrop = (place: string, event: any) => {
    event.preventDefault();
    event.stopPropagation();
    var data = event.dataTransfer.getData('id');
    console.log(data);
    const id = data.substring(5);
    const index = group.findIndex((item: any) => item.id === id);
    const newGroup = [...group];
    const todo = newGroup[index];
    todo.place = place;
    setGroup(newGroup);
    updateToDoRes(todo.id, todo.title, todo.completed, todo.place)
  }

  const arr = [];
  const newArr = [];
  for (var i = 0; i <= group.length - 1; i++) {
    if (group[i].completed === false) {
      arr.push(group[i])
    } else { newArr.push(group[i]) }
  }

  const rendergroup = (group: any) => {
    return (
      <>
        {group.map((item: any) => (
          <div
            className="Quadrant_items-1"
            style={item.completed ? { display: "none" } : {}}
            id={`drag_${item.id}`}
            draggable={true}
            onDragStart={drag}
            onDrop={drop}
            onDragOver={allowDrop}
          >
            <input className="Quadrant_box-1"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCompleted(item.id)}
            />
            {item.title} - {item.id}
            <div className="Quadrant_remove" onClick={() => handleRemove(item.id)}></div>
          </div>
        ))}
      </>
    )
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
        <div className='Quadrant_urgence'>不紧急</div>
        <div className='Quadrant_group'>
          <div className='Quadrant_item Quadrant_second' onDrop={(e) => handleOnDrop('2', e)} onDragOver={allowDrop}>
            {rendergroup(group.filter((item: any) => String(item.place) === '2'))}
          </div>
          <div className='Quadrant_item Quadrant_first' onDrop={(e) => handleOnDrop('1', e)} onDragOver={allowDrop}>
            {rendergroup(group.filter((item: any) => String(item.place) === '1'))}
          </div>
          <div className='Quadrant_item Quadrant_third' onDrop={(e) => handleOnDrop('3', e)} onDragOver={allowDrop}>
            {rendergroup(group.filter((item: any) => String(item.place) === '3' || item.place === undefined))}
          </div>

          <div className='Quadrant_item Quadrant_fourth' onDrop={(e) => handleOnDrop('4', e)} onDragOver={allowDrop}>
            {rendergroup(group.filter((item: any) => String(item.place) === '4'))}
          </div>
        </div>
        <div className='Quadrant_urgence'>紧急</div>
      </div>
      <div className='Quadrant_unImportance'>不重要</div>

      <div className="Quadrant_main">
        <div className="Quadrant_done">
          <div className="Quadrant_title-1">已经完成</div>
          <div className="Quadrant_count">{newArr.length}</div>
        </div>
        <div className="Quadrant_doneitems">
          {group.map((item: any) => (
            <div
              className="Quadrant_items-1"
              style={item.completed ? {} : { display: "none" }}
              id={`drag_${item.id}`}
              draggable={true}
              onDragStart={drag}
              onDrop={drop}
              onDragOver={allowDrop}
            >
              <input className="Quadrant_box-1"
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCompleted(item.id)}
              />
              {item.title}
              <div className="Quadrant_remove" onClick={() => handleRemove(item.id)}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
