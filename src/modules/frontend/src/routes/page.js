import React from 'react';
import {Helmet} from 'react-helmet';
import config from '../config';

/**
 * Wraps page options around the page component
 * @param Component
 * @param options
 * @returns {*}
 */
export const withPage = (Component, options) => {
    return () => (
        <>
            <Helmet>
                <title>{config.page_title_prefix + ' - ' + options.title}</title>
            </Helmet>
            <Component />
        </>
    )
};