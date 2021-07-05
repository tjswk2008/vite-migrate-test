export default function (name, params) {
  this.$router.push({
    name,
    params: {...params},
    query: {...this.$store.state.gameInfo}
  })
}