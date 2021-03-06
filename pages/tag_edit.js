import { Mutation, Query } from "react-apollo"
import { withRouter } from "next/router"
import App from "../components/App"
import Form from "../components/forms/tag"
import SAVE_TAG from "../queries/saveTag.gql"
import REMOVE_TAG from "../queries/removeTag.gql"
import TAGS from "../queries/tags.gql"
import Loading from "../components/Loading"

const Page = ({ client, data, update, remove }) => (
  <App>
    <Form data={data} update={update} remove={remove} client={client} />
  </App>
)

const TagEdit = ({ router: { query } }) => {
  if (Object.entries(query).length !== 0 || query.constructor !== Object) {
    return (
      <Mutation mutation={SAVE_TAG}>
        {(update, { error: errorUpdate, client: clientUpdate }) => (
          <Mutation mutation={REMOVE_TAG}>
            {(remove, { error: errorRemove }) => (
              <Query query={TAGS} variables={{ id: query.id }}>
                {({ loading, data, error }) => {
                  if (!loading && data) {
                    return (
                      <Page
                        remove={remove}
                        update={update}
                        data={data.projectTags[0]}
                        client={clientUpdate}
                      />
                    )
                  } else return <Loading />
                }}
              </Query>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  } else {
    return (
      <Mutation mutation={SAVE_TAG}>
        {(update, { error: errorUpdate, client: clientUpdate }) => (
          <Page client={clientUpdate} update={update} />
        )}
      </Mutation>
    )
  }
}

export default withRouter(TagEdit)
