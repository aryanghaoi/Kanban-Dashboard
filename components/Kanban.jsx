import React, { useEffect, useState } from 'react';
import '../styles/Kanban.css';
import Card from './Card';
import Dropdown from "../components/Dropdown";

const svgs = ["Backlog", "In-Progress", "Done", "Cancelled", "Todo"];
const prioritySvgs = ["No-priority.svg", "Img - Low Priority.svg", "Img - Medium Priority.svg", "Img - High Priority.svg", "SVG - Urgent Priority colour.svg"];

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState({
    grouping: "status",
    ordering: "priority",
  });
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const data = await response.json();
      setTasks(data.tickets);
      setUsers(data.users);
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!tasks.length || !users.length) return;

    const groupTasks = (tasks, grouping) => {
      return tasks.reduce((grouped, task) => {
        const key =
          grouping === "user"
            ? users.find((user) => user.id === task.userId)?.name || 'Uncategorized'
            : grouping === "priority"
              ? task.priority
              : task[grouping] || 'Uncategorized';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(task);
        return grouped;
      }, {});
    };

    const orderTasks = (tasks, ordering) => {
      return tasks.sort((a, b) => {
        if (ordering === "priority") {
          return a.priority - b.priority;
        } else if (ordering === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    };

    if (display?.grouping) {
      const grouped = groupTasks(tasks, display.grouping);
      Object.keys(grouped).forEach((key) => {
        grouped[key] = orderTasks(grouped[key], display.ordering);
      });
      setGroupedTasks(grouped);
    }
  }, [display, tasks, users]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#D4D4D4" }}>
      <header style={{ background: "white", width: "100vw" }}>
        <Dropdown setDisplay={setDisplay} display={display} />
      </header>
      <div className="kanban-board" style={{ padding: "18px 12px" }}>
        {Object.keys(groupedTasks).map((groupKey) => (
          <div className="kanban-column" key={groupKey}>
            <div className="column-header">
              <div style={{ display: "flex", gap: "6px" }}>
                {display.grouping === "user" ? (
                  <img src={"https://i.pravatar.cc/100"} alt="User" className="profile-pic" />
                ) : display.grouping === "priority" ? (
                  <img
                    src={"/icons_FEtask/" + prioritySvgs[groupKey]}
                    alt={groupKey + " icon"}
                  />
                ) : (
                  <img
                    src={"/icons_FEtask/" + svgs[["Todo", "In progress", "Done", "Cancelled", "Backlog"].indexOf(groupKey)] + ".svg"}
                    alt={groupKey + " icon"}
                  />
                )}
                <span className="column-title">
                  {display.grouping === "priority"
                    ? ["No Priority", "Low", "Medium", "High", "Urgent"][groupKey] || "Uncategorized"
                    : groupKey}
                </span>

                <span className="task-count">{groupedTasks[groupKey].length}</span>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <img src="/icons_FEtask/add.svg" alt="Add icon" />
                <img src="/icons_FEtask/3 dot menu.svg" alt="Menu icon" />
              </div>
            </div>
            <div className="task-list">
              {groupedTasks[groupKey].map((task) => (
                <Card key={task.id} id={task.id} title={task.title} user={task.userId} tag={task.tag[0]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
