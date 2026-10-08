const base = {
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
    focusable: false
};

export const UserIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="7.5" r="4.5" />
        <path d="M3 21c0-4.4 3.8-7 9-7s9 2.6 9 7v.5a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5V21z" />
    </svg>
);

export const MailIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M3 5h18a1 1 0 0 1 1 1v.4l-10 6.3L2 6.4V6a1 1 0 0 1 1-1zm-1 4.2 10 6.3 10-6.3V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9.2z" />
    </svg>
);

export const LockIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M7 10V7a5 5 0 0 1 10 0v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h6V7a3 3 0 0 0-6 0v3z" />
    </svg>
);

export const ShieldIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3z" />
    </svg>
);

export const EyeIcon = ({ off, ...props }) => (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
        {off && <path d="M3 3l18 18" />}
    </svg>
);

export const LogoutIcon = (props) => (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4" />
        <path d="M16 8l4 4-4 4M20 12H9" />
    </svg>
);

export const PlusIcon = (props) => (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...props}>
        <path d="M12 4v16M4 12h16" />
    </svg>
);

export const EditIcon = (props) => (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" />
        <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

export const TrashIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M9 3h6l1 2h4a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h4l1-2zM5 9h14l-1 11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 9z" />
    </svg>
);

export const ArrowDownIcon = (props) => (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
);

export const ArrowUpIcon = (props) => (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 20V5M6 11l6-6 6 6" />
    </svg>
);
