'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  /** Rendered instead of the children after a render error. `reset` re-mounts the children. */
  fallback: (reset: () => void) => ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
}

/** Contains a render error to one widget so the rest of the page keeps working. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Widget error', error, info.componentStack)
  }

  reset = () => this.setState({ hasError: false })

  render() {
    return this.state.hasError ? this.props.fallback(this.reset) : this.props.children
  }
}
