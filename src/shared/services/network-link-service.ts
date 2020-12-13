import { userDoc } from './user-service';
import { NetworkEntity } from '../models/network-link.model';

export const getAccounts = async (userId?: string) => {
  const data = await userDoc(userId)
    .collection('network')
    .orderBy('order', 'asc')
    .get();

  const linksEntity = {} as NetworkEntity;
  data.docs.forEach((doc: any) => {
    linksEntity[doc.id] = { id: doc.id, ...doc.data() };
  });
  return linksEntity;
};

export const updateAccount = async (
  userId: string,
  id: string,
  payload: any
) => {
  return await userDoc(userId).collection('network').doc(id).update(payload);
};
