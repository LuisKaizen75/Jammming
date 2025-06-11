import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../SearchBar'

test('calls setQuery with input value on submit', () => {
  const setQuery = jest.fn()
  render(<SearchBar setQuery={setQuery} />)
  fireEvent.change(screen.getByPlaceholderText('Song title'), { target: { value: 'My song' } })
  fireEvent.click(screen.getByText('Search'))
  expect(setQuery).toHaveBeenCalledWith('My song')
})