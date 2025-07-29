import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useToast } from './useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test('should add a toast with success type', () => {
    const { toasts, success } = useToast()
    success('Operation successful')
    
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]).toEqual({
      id: 1,
      message: 'Operation successful',
      type: 'success'
    })
  })

  test('should add a toast with error type', () => {
    const { toasts, denied } = useToast()
    denied('Operation failed')
    
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]).toEqual({
      id: 1,
      message: 'Operation failed',
      type: 'error'
    })
  })

  test('should add a toast with info type', () => {
    const { toasts, info } = useToast()
    info('Some information')
    
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]).toEqual({
      id: 1,
      message: 'Some information',
      type: 'info'
    })
  })

  test('should add a toast with warning type', () => {
    const { toasts, warning } = useToast()
    warning('Be careful')
    
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]).toEqual({
      id: 1,
      message: 'Be careful',
      type: 'warning'
    })
  })

  test('should remove toast after 5 seconds', () => {
    const { toasts, success } = useToast()
    success('Temporary message')
    
    expect(toasts.value).toHaveLength(1)
    
    // Fast-forward 5 seconds
    vi.advanceTimersByTime(5000)
    
    expect(toasts.value).toHaveLength(0)
  })

  test('should manually remove a toast', () => {
    const { toasts, success, removeToast } = useToast()
    success('Message to remove')
    
    expect(toasts.value).toHaveLength(1)
    
    removeToast(1)
    
    expect(toasts.value).toHaveLength(0)
  })

  test('should increment toast IDs', () => {
    const { toasts, success } = useToast()
    success('First message')
    success('Second message')
    success('Third message')
    
    expect(toasts.value).toHaveLength(3)
    expect(toasts.value[0]?.id).toBe(1)
    expect(toasts.value[1]?.id).toBe(2)
    expect(toasts.value[2]?.id).toBe(3)
  })

  test('should handle multiple toasts with different types', () => {
    const { toasts, success, denied, info, warning } = useToast()
    success('Success message')
    denied('Error message')
    info('Info message')
    warning('Warning message')
    
    expect(toasts.value).toHaveLength(4)
    expect(toasts.value.map(t => t.type)).toEqual(['success', 'error', 'info', 'warning'])
  })
}) 
