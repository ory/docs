import { getNodeId, isUiNodeInputAttributes } from "@ory/integrations/ui"
import { UiNode } from "@ory/client"
import { Component, FormEvent } from "react"
import { Node } from "./Node"
import { showMessages } from "@/helper/showMessages"
import { FlowProps, Values } from "@/types"

function emptyState<T>() {
  return {} as T
}

type State<T> = {
  values: T
  isLoading: boolean
}

// TODO Transform this into a function component
export class Flow<T extends Values> extends Component<FlowProps<T>, State<T>> {
  constructor(props: FlowProps<T>) {
    super(props)
    this.state = {
      values: emptyState(),
      isLoading: false,
    }
  }

  componentDidMount() {
    this.initializeValues(this.filterNodes())
  }

  componentDidUpdate(prevProps: FlowProps<T>) {
    if (prevProps.flow !== this.props.flow) {
      // Flow has changed, reload the values!
      this.initializeValues(this.filterNodes())
    }
  }

  initializeValues = (nodes: Array<UiNode> = []) => {
    // Compute the values
    const values = emptyState<T>()
    nodes.forEach((node) => {
      // This only makes sense for text nodes
      if (isUiNodeInputAttributes(node.attributes)) {
        if (node.attributes.type === "button" || node.attributes.type === "submit") {
          // In order to mimic real HTML forms, we need to skip setting the value
          // for buttons as the button value will (in normal HTML forms) only trigger
          // if the user clicks it.
          return
        }
        values[node.attributes.name as keyof Values] = node.attributes.value
      }
    })

    // Set all the values!
    this.setState((state) => ({ ...state, values }))
  }

  filterNodes = (): Array<UiNode> => {
    const { flow, only } = this.props
    if (!flow) {
      return []
    }
    return flow.ui.nodes.filter(({ group }) => {
      if (!only) {
        return true
      }
      return group === "default" || group === only
    })
  }

  // Handles form submission
  handleSubmit = (e: MouseEvent | FormEvent) => {
    // Prevent all native handlers
    e.stopPropagation()
    e.preventDefault()

    // Prevent double submission!
    if (this.state.isLoading) {
      return Promise.resolve()
    }

    this.setState((state) => ({
      ...state,
      isLoading: true,
    }))

    return this.props.onSubmit(this.state.values).finally(() => {
      // We wait for reconciliation and update the state after 50ms
      // Done submitting - update loading status
      this.setState((state) => ({
        ...state,
        isLoading: false,
      }))
    })
  }

  render() {
    const { hideGlobalMessages, flow } = this.props
    const { values, isLoading } = this.state

    // Filter the nodes - only show the ones we want
    const nodes = this.filterNodes()

    if (!flow) {
      // No flow was set yet? It's probably still loading...
      //
      // Nodes have only one element? It is probably just the CSRF Token
      // and the filter did not match any elements!
      return null
    }

    return (
      <form
        action={flow.ui.action}
        method={flow.ui.method}
        onSubmit={this.handleSubmit}
        className="space-y-6"
      >
        {!hideGlobalMessages ? showMessages(flow.ui.messages) : null}
        {nodes.map((node, k) => {
          const id = getNodeId(node) as keyof Values
          return (
            <Node
              key={`${id}-${k}`}
              disabled={isLoading}
              node={node}
              value={values[id]}
              dispatchSubmit={this.handleSubmit}
              setValue={(value) =>
                new Promise((resolve) => {
                  this.setState(
                    (state) => ({
                      ...state,
                      values: {
                        ...state.values,
                        [getNodeId(node)]: value,
                      },
                    }),
                    resolve
                  )
                })
              }
            />
          )
        })}
      </form>
    )
  }
}
