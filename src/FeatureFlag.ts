
let components: String[] = [];
if (process.env.REACT_APP_ENABLE_MY_REPOS || false) {
  components.push("RepoTabs")
}

export const enabledComponents = () => {
  return components;
}
  
export const isComponentEnabled = (name: string) => {
  return enabledComponents().includes(name);
}