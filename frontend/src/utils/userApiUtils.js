import { csrfFetch } from "../store/csrf.js"

export const fetchAllUsers = () => (
    fetch('/api/users')
      .then(res => {
        if(res.ok) {
          return res.json()
        } else {
          // error handling
        }
      })
  )
  
export const fetchUser = async userId => {
    const res = await fetch(`/api/users/${userId}`)
    if (res.ok) {
      const data = await res.json()
      return data
    } else {
      // error handling
    }
}
  
export const createUser = async user => {
    const res = await csrfFetch('/api/users', {
      method: 'POST',
      body: user
    })
    if (res.ok) {
      const userData = await res.json()
      return userData
    } else {
      const errors = await res.json()
      throw errors
    }
}
  
export const deleteUser = userId => (
    fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          // error handling
        }
      })
)