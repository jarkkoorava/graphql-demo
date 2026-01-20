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
    {
        "id": "c3",
        "name": "Helios Energy",
        "industry": "Renewable Energy",
    },
    {
        "id": "c4",
        "name": "BluePeak Consulting",
        "industry": "Business Consulting",
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
    {
        "id": "p3",
        "name": "Solar Plant Monitoring",
        "customer_id": "c3",
    },
    {
        "id": "p4",
        "name": "Grid Optimization Platform",
        "customer_id": "c3",
    },
    {
        "id": "p5",
        "name": "Energy Data Warehouse",
        "customer_id": "c3",
    },
    {
        "id": "p6",
        "name": "Client CRM Revamp",
        "customer_id": "c4",
    },
    {
        "id": "p7",
        "name": "Performance Analytics Dashboard",
        "customer_id": "c4",
    },
]

tasks = [
    {
        "id": "t1",
        "title": "Migrate database",
        "status": "TODO",
        "priority": "MEDIUM",
        "project_id": "p1",
    },
    {
        "id": "t2",
        "title": "Validate financial reports",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "project_id": "p1",
    },
    {
        "id": "t3",
        "title": "Set up CI pipeline",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "project_id": "p2",
    },
    {
        "id": "t4",
        "title": "Refactor auth module",
        "status": "TODO",
        "priority": "MEDIUM",
        "project_id": "p2",
    },
    {
        "id": "t5",
        "title": "Integrate sensor data",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "project_id": "p3",
    },
    {
        "id": "t6",
        "title": "Alerting rules for outages",
        "status": "TODO",
        "priority": "MEDIUM",
        "project_id": "p3",
    },
    {
        "id": "t7",
        "title": "Load forecasting model",
        "status": "TODO",
        "priority": "HIGH",
        "project_id": "p4",
    },
    {
        "id": "t8",
        "title": "API for grid operators",
        "status": "TODO",
        "priority": "MEDIUM",
        "project_id": "p4",
    },
    {
        "id": "t9",
        "title": "Design data schema",
        "status": "DONE",
        "priority": "LOW",
        "project_id": "p5",
    },
    {
        "id": "t10",
        "title": "ETL pipeline setup",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "project_id": "p5",
    },
    {
        "id": "t11",
        "title": "Customer segmentation logic",
        "status": "TODO",
        "priority": "MEDIUM",
        "project_id": "p6",
    },
    {
        "id": "t12",
        "title": "Sales workflow redesign",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "project_id": "p6",
    },
    {
        "id": "t13",
        "title": "KPI definition workshop",
        "status": "DONE",
        "priority": "LOW",
        "project_id": "p7",
    },
    {
        "id": "t14",
        "title": "Dashboard UI implementation",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "project_id": "p7",
    },
]
