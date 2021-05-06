import React from 'react';
import { initialize, reset, change } from 'redux-form';
import moment from 'moment';

// Components
import Layout from '../../components/Layout';
import ViewListing from './ViewListing';
import NotFound from '../notFound/NotFound';

// Actions
import { getTimesLookup } from '../../actions/Listing/getTimesLookup';
import { getDefaultCardDetails } from '../../actions/Cards/getDefaultCardDetails';
import { setSelectedActivityType } from '../../actions/Activities/handleActivies';

// Helper
import { decode } from '../../helpers/base64Encryption';
import fetch from '../../core/fetch';
import { url, fileuploadDir } from '../../config.js';
import { renderComponent, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'View Listing';

function renderNotFoundPage(account) {
  return {
    title,
    component: renderNotFound(account, title),
    status: 404,
  };
}

export default {

  path: '/space/:listId/:preview?',

  async action({ params, store, query }) {


    let listTitle, listDescription, listPhoto, lat, lng, startDate, endDate;
    const baseCurrency = store.getState().currency.base;
    const getListquery = `
      query GetListMeta($listId: Int!) {
        getListMeta(listId: $listId) {
          id
          title
          description
          isPublished
          listPhotos {
            id
            name
          }
          activity{
            id
            activityType
          }
          status
          lat
          lng
        }
      }
    `;

    // From URI
    let listURL = params.listId;
    let listId, listURLData;
    let preview = false;

    if (params.preview) {
      preview = true;
    }


    let activityType;
    if (query && query.dates) {
      store.dispatch(change('SearchForm', 'dates', query.dates));
    } else {
      store.dispatch(change('SearchForm', 'dates', ''));
    }
    if (!preview && query && query.c) {
      let splitValue = decode(query.c);
      if (splitValue.indexOf('&') > -1) {
        let result = splitValue && splitValue.split("&");
        activityType = result[0];
      } else {
        activityType = splitValue;
      }
    }

    if (listURL && listURL.indexOf('-') >= 0) {
      listURLData = listURL.split('-');
      listId = listURLData[listURLData.length - 1];
    } else {
      listId = listURL;
    }

    // const dates = params.dates;
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getListquery,
        variables: { listId }
      }),
    });
    const { data } = await resp.json();

    await store.dispatch(getDefaultCardDetails())

    if ('startDate' in query && 'endDate' in query) {
      startDate = moment(query.startDate);
      endDate = moment(query.endDate);
    }

    if (data && data.getListMeta) {
      if (!data.getListMeta.isPublished && !preview) {
        renderNotFoundPage(store.getState().account);
        return;
      }
      listTitle = data.getListMeta.title;
      listDescription = data.getListMeta.description;
      lat = data.getListMeta.lat;
      lng = data.getListMeta.lng;
      if (data.getListMeta.listPhotos && data.getListMeta.listPhotos.length > 0) {
        listPhoto = url + '/' + fileuploadDir + data.getListMeta.listPhotos[0].name;
      }

      if (!activityType) {
        activityType = data.getListMeta.activity[0] && data.getListMeta.activity[0].activityType;
      }

    } else {
      renderNotFoundPage(store.getState().account);
      return;
    }

    store.dispatch(setSelectedActivityType(activityType));

    if (preview && (listId === undefined || isNaN(listId))) {
      renderNotFoundPage(store.getState().account);
      return;
    } else if (!preview && (listId === undefined || isNaN(listId) || !activityType || isNaN(activityType))) {
      renderNotFoundPage(store.getState().account);
      return;
    }

    let spaceURL;
    if (params.listId && query.c) {
      spaceURL = '/space/' + params.listId + '?c=' + query.c;
    }
    store.dispatch(reset('BookingForm'));
    const initialValues = { extendDay: [{}], spaceURL };
    store.dispatch(initialize('BookingForm', initialValues, true));
    store.dispatch(getTimesLookup(Number(listId), 0));

    return {
      title: listTitle || title,
      description: listDescription || '',
      image: listPhoto || '',
      component: renderComponent(store.getState().account, <ViewListing
        title={title}
        preview={preview}
        lat={lat}
        lng={lng}
        listId={Number(listId)}
        startDate={startDate}
        endDate={endDate}
        baseCurrency={baseCurrency}
      />)

    };
  },

};
