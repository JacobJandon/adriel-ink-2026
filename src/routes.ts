import type { RouteObject } from 'react-router';
import React from 'react';

import App from './App';
import Home from './routes/home';
import Chat from './routes/chat/chat';
import Profile from './routes/profile';
import Settings from './routes/settings/index';
import AppsPage from './routes/apps';
import AppView from './routes/app';
import DiscoverPage from './routes/discover';
import GuidePage from './routes/guide';
import PricingPage from './routes/pricing/index';
import TermsPage from './routes/terms';
import PrivacyPage from './routes/privacy';
import CookiePolicyPage from './routes/cookies';
import ContactPage from './routes/contact';
import AboutPage from './routes/about';
import StatusPage from './routes/status';
import ServerErrorPage from './routes/server-error';
import NotFoundPage from './routes/not-found';
import { ProtectedRoute } from './routes/protected-route';

const routes = [
	{
		path: '/',
		Component: App,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: 'chat/:chatId',
				Component: Chat,
			},
			{
				path: 'profile',
				element: React.createElement(ProtectedRoute, { children: React.createElement(Profile) }),
			},
			{
				path: 'settings',
				element: React.createElement(ProtectedRoute, { children: React.createElement(Settings) }),
			},
			{
				path: 'apps',
				element: React.createElement(ProtectedRoute, { children: React.createElement(AppsPage) }),
			},
			{
				path: 'app/:id',
				Component: AppView,
			},
		{
			path: 'discover',
			Component: DiscoverPage,
		},
		{
			path: 'guide',
			Component: GuidePage,
		},
		{
			path: 'pricing',
			Component: PricingPage,
		},
		{
			path: 'terms',
			Component: TermsPage,
		},
		{
			path: 'privacy',
			Component: PrivacyPage,
		},
		{
			path: 'cookies',
			Component: CookiePolicyPage,
		},
		{
			path: 'contact',
			Component: ContactPage,
		},
		{
			path: 'about',
			Component: AboutPage,
		},
		{
			path: 'status',
			Component: StatusPage,
		},
		{
			path: 'error',
			Component: ServerErrorPage,
		},
		{
			path: '*',
			Component: NotFoundPage,
		},
	],
},
] satisfies RouteObject[];

export { routes };