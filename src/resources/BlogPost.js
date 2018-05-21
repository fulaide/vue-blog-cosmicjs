export default {
  post(id) {
    return {
      path: `/object/${id}`,
      resolve: (response, mappers) => {
        let { title, content, created_at, metadata } = response.object
        let meta = {
          description: metadata.description,
          published: created_at,
          author: metadata.author.title,
          duration: metadata.duration,
          presenter: metadata.presenter,
          company: metadata.company,
          seats: metadata.seats,
          closed: metadata.closed
        }
        return mappers.merge({ title, content, ...meta })
      }
    }
  }
}
