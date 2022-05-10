import React from 'react';
import {AuthenticationView} from "./authentication/AuthenticationView";
import { DetailsView } from './details/DetailsView';
import {SearchView} from './search/SearchView';

interface AppProps {}

interface AppState {
  apiKey: string;
  selectedSearchResult: any; // TODO
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {apiKey: "", selectedSearchResult: null};
  }

  protected setUpApiKey = (apiKey: string): void => {
    this.setState({
      apiKey,
    });
  }

  protected setSelectedSearchResult = (searchResult: any): void => {
    this.setState({selectedSearchResult: searchResult});
  }

  public render() {
    const {apiKey, selectedSearchResult} = this.state;
    if (!apiKey) {
      return (<AuthenticationView onStart={this.setUpApiKey}/>)
    }

    if (selectedSearchResult) {
      return (<DetailsView
        searchResult={selectedSearchResult}
        onSelectResult={this.setSelectedSearchResult}
      />)
    }

    return <SearchView apiKey={apiKey} onSelectResult={this.setSelectedSearchResult} />
  }
}
