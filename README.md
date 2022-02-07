
# Ηλεκτρολογικός Πίνακας

Διπλωματική ηλεκτρολογικού πίνακα συνδεδεμένη με backend server και MongoDB.

## Σημείωσεις

In order to interact with the API take into consideration the neccessary fields that are required for requesting.

**ΝΟΤΕ**: `* = Required`
## API Reference
All possible routes for interacting with the backend server.

#### Get all relays

```http
  GET /api/v1/relays
```
---
#### Create relay

```http
  POST /api/v1/relays
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `place` | `string` | (*) Name of the space utilizing the specific relay |
| `operation` | `string` | (*) Operation of the specified relay |
| `pin` | `int` | (*) RaspberryPi Pin |
| `state` | `bool` | (*) Relay state (on / off) |

##### Example of Relay
```json
{
    "place": "Grafio",
    "operation": "lampa",
    "pin": 32,
    "state": false
}
```
---

#### Get relay by place

```http
  GET /api/v1/relays/place
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `place`      | `string` | (*) Place of relay to fetch |

---
#### Update relay by {id}

```http
  PATCH /api/v1/relays/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `place` | `string` | (*) Name of the space utilizing the specific relay |
| `operation` | `string` | (*) Operation of the specified relay |
| `pin` | `int` | (*) RaspberryPi Pin |
| `state` | `bool` | (*) Relay state (on / off) |

---
#### Update State (on / off) by {id}

```http
  PATCH /api/v1/relays/onoff/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `state`      | `bool` | (*) Change state of relay |




## Authors

- [@EvangelosSyrmos](https://github.com/EvangelosSyrmos)

