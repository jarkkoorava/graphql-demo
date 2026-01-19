from typing import List, Dict

customers = [
    {
        "id": "c1",
        "name": "Acme Corp",
        "industry": "Manufacturing",
    },
    {
        "id": "c2",
        "name": "Nordic IT",
        "industry": "Software",
    },
]

projects = [
    {
        "id": "p1",
        "name": "ERP Migration",
        "customer_id": "c1",
    },
    {
        "id": "p2",
        "name": "Internal Tooling",
        "customer_id": "c2",
    },
]

tasks = [
    {
        "id": "t1",
        "title": "Set up CI",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "project_id": "p2",
    },
    {
        "id": "t2",
        "title": "Migrate database",
        "status": "TODO",
        "priority": "MEDIUM",
        "project_id": "p1",
    },
]
