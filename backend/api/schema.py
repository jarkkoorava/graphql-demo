import strawberry
from typing import List
from enum import Enum
from typing import Optional
from dataclasses import dataclass

from api import data


@strawberry.enum
class TaskStatus(Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"


@strawberry.enum
class TaskPriority(Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


def next_task_id() -> str:
    existing_nums = []
    for task in data.tasks:
        if task["id"].startswith("t"):
            suffix = task["id"][1:]
            if suffix.isdigit():
                existing_nums.append(int(suffix))
    return f"t{(max(existing_nums) if existing_nums else 0) + 1}"


@strawberry.input
class CreateTaskInput:
    project_id: str
    title: str
    status: TaskStatus = TaskStatus.TODO
    priority: TaskPriority = TaskPriority.MEDIUM


@strawberry.input
class UpdateTaskStatusInput:
    task_id: str
    status: TaskStatus


@strawberry.type
class Task:
    id: str
    title: str
    status: TaskStatus
    priority: TaskPriority


@strawberry.type
class Project:
    id: str
    name: str

    @strawberry.field
    def tasks(
        self,
        status: Optional[TaskStatus] = None,
        search: Optional[str] = None,
    ) -> List[Task]:
        filtered = [task for task in data.tasks if task["project_id"] == self.id]

        if status is not None:
            filtered = [task for task in filtered if task["status"] == status.value]

        if search:
            search_lower = search.lower()
            filtered = [
                task for task in filtered if search_lower in task["title"].lower()
            ]

        return [
            Task(
                id=task["id"],
                title=task["title"],
                status=TaskStatus(task["status"]),
                priority=TaskPriority(task["priority"]),
            )
            for task in filtered
        ]


@strawberry.type
class Customer:
    id: str
    name: str
    industry: str | None = None

    @strawberry.field
    def projects(self) -> List[Project]:
        return [
            Project(
                id=project["id"],
                name=project["name"],
            )
            for project in data.projects
            if project["customer_id"] == self.id
        ]


@strawberry.type
class Query:
    @strawberry.field
    def customers(self) -> List[Customer]:
        return [Customer(**customer) for customer in data.customers]


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_task(self, input: CreateTaskInput) -> Task:
        new_task = {
            "id": next_task_id(),
            "title": input.title,
            "status": input.status.value,
            "priority": input.priority.value,
            "project_id": input.project_id,
        }

        data.tasks.append(new_task)

        return Task(
            id=new_task["id"],
            title=new_task["title"],
            status=TaskStatus(new_task["status"]),
            priority=TaskPriority(new_task["priority"]),
        )

    @strawberry.mutation
    def update_task_status(self, input: UpdateTaskStatusInput) -> Task:
        for task in data.tasks:
            if task["id"] == input.task_id:
                task["status"] = input.status.value
                return Task(
                    id=task["id"],
                    title=task["title"],
                    status=TaskStatus(task["status"]),
                    priority=TaskPriority(task["priority"]),
                )

        raise ValueError(f"Task not found: {input.task_id}")


schema = strawberry.Schema(query=Query, mutation=Mutation)
