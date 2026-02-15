import React from 'react';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUser, getReceivedConnectionRequests, respondToConnectionRequest } from '@/config/redux/action/authAction';
import { BASE_URL } from '@/config';
import styles from './index.module.css';
import { useRouter } from 'next/router';

const MyConnectionsPage = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const [respondingIds, setRespondingIds] = useState(new Set());
    const router = useRouter();

    useEffect(() => {
        dispatch(getReceivedConnectionRequests());
        dispatch(getAboutUser({token: localStorage.getItem("token")}));
    }, [dispatch]);

    const handleAccept = async (requestId) => {
        setRespondingIds(prev => new Set(prev).add(requestId));
        await dispatch(respondToConnectionRequest({ requestId, action: 'accept' }));
        dispatch(getReceivedConnectionRequests());
        setRespondingIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(requestId);
            return newSet;
        });
    };

    const handleReject = async (requestId) => {
        setRespondingIds(prev => new Set(prev).add(requestId));
        await dispatch(respondToConnectionRequest({ requestId, action: 'reject' }));
        dispatch(getReceivedConnectionRequests());
        setRespondingIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(requestId);
            return newSet;
        });
    };

    const getProfilePicture = (path) => {
        if (!path || path === 'default.jpg') return `${BASE_URL}/default.jpg`;
        return `${BASE_URL}/${path.replace(/\\/g, '/').replace(/^\/+/, '')}`;
    };

    const pendingRequests = authState.connectionRequests?.filter(req => req.status_accepted === null) || [];
    const acceptedConnections = authState.connectionRequests?.filter(req => req.status_accepted === true) || [];

    return (
        <UserLayout>
            <DashboardLayout>
                <div className={styles.container}>
                    {/* Pending Requests Section */}
                    <h1 className={styles.title}>Connection Requests</h1>
                    
                    {pendingRequests.length === 0 ? (
                        <p className={styles.noRequests}>No pending connection requests</p>
                    ) : (
                        <div className={styles.requestsContainer}>
                            {pendingRequests.map((request) => (
                                <div key={request._id} className={styles.requestCard}>
                                    <div onClick={()=>{
                                        router.push(`/view_profile/${request.userId?.username}`);
                                    }} className={styles.userInfo}>
                                        <img 
                                            src={getProfilePicture(request.userId?.profilePicture)} 
                                            alt={request.userId?.name || 'User'} 
                                            className={styles.profileImage}
                                        />
                                        <div className={styles.userDetails}>
                                            <h3 className={styles.userName}>{request.userId?.name}</h3>
                                            <p className={styles.username}>@{request.userId?.username}</p>
                                            <p className={styles.email}>{request.userId?.email}</p>
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <button
                                            className={`${styles.button} ${styles.acceptBtn}`}
                                            onClick={() => handleAccept(request._id)}
                                            disabled={respondingIds.has(request._id)}
                                        >
                                            {respondingIds.has(request._id) ? 'Processing...' : '✓ Accept'}
                                        </button>
                                        <button
                                            className={`${styles.button} ${styles.rejectBtn}`}
                                            onClick={() => handleReject(request._id)}
                                            disabled={respondingIds.has(request._id)}
                                        >
                                            {respondingIds.has(request._id) ? 'Processing...' : '✕ Reject'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Accepted Connections Section */}
                    <h2 className={styles.networkTitle}>My Network ({acceptedConnections.length})</h2>
                    
                    {acceptedConnections.length === 0 ? (
                        <p className={styles.noRequests}>No accepted connections yet</p>
                    ) : (
                        <div className={styles.requestsContainer}>
                            {acceptedConnections.map((connection) => (
                                <div key={connection._id} className={`${styles.requestCard} ${styles.connectedCard}`}>
                                    <div onClick={()=>{
                                        router.push(`/view_profile/${connection.userId?.username}`);
                                    }} className={styles.userInfo}>
                                        <img 
                                            src={getProfilePicture(connection.userId?.profilePicture)} 
                                            alt={connection.userId?.name || 'User'} 
                                            className={styles.profileImage}
                                        />
                                        <div className={styles.userDetails}>
                                            <h3 className={styles.userName}>{connection.userId?.name}</h3>
                                            <p className={styles.username}>@{connection.userId?.username}</p>
                                            <p className={styles.email}>{connection.userId?.email}</p>
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <button
                                            className={`${styles.button} ${styles.connectedBtn}`}
                                            disabled
                                        >
                                            ✓ Connected
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </UserLayout>
    );
}

export default MyConnectionsPage;
