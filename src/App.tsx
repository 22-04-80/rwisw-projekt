import React from 'react';
import {AuthenticationView} from "./authentication/AuthenticationView";
import {SearchView} from './search/SearchView';

interface AppProps {}

interface AppState {
  apiKey: string;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {apiKey: ""};
  }

  protected setUpApiKey = (apiKey: string): void => {
    this.setState({
      apiKey,
    });
  }

  public render() {
    const {apiKey} = this.state;

    return apiKey
      ? (
        <SearchView apiKey={apiKey} />
      )
      : (
        <AuthenticationView onStart={this.setUpApiKey}/>
      );
  }
}
