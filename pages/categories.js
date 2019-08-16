import App from "../components/App"
import CATEGORIES from "../queries/categories.gql"
import Table from "../components/Table"
import Form from "../components/forms/contentForm"

export default ({ classes }) => {
  return (
    <App>
      <Form
        title='Texto sobre a página'
        field='categoriesHtml'
        style={{ paddingBottom: 80 }}
      />
      <Table
        query={CATEGORIES}
        returnUrl={"/categories"}
        editUrl='/category_edit?category='
        title='Linhas de Acao'
        noCreate
        columns={[
          { title: "ID", field: "id" },
          { title: "Nome", field: "name" },
          { title: "Category", field: "category" },
          { title: "Criado", field: "createdAt" }
        ]}
      />
      <style jsx>{``}</style>
    </App>
  )
}
