import { firestore } from '../firebase/firebase';

export default class LinksService {

  constructor(private userId?: string) { }

  parentCollection = firestore.collection('users');
  linksCollection = this.parentCollection.doc(this.userId).collection('links');

  groupCollectionByProfile = firestore.collectionGroup('links');
    

  getAllLinks = async (id?: string) => {
    const data = await this.linksCollection.orderBy('order', 'asc').get();
    const linksEntity = {} as any;
    data.docs.forEach((doc: any) => {
      linksEntity[doc.id] = { id: doc.id, ...doc.data() };
    });
    return linksEntity;
  };

  getExposedLinksByProfile = async (profile: string) => {
    const groupRef = firestore.collectionGroup('links').where('profile', '==', profile);
    const orderedGroup = groupRef.orderBy('order', 'asc');
    const group = await orderedGroup.get();
    const linksEntity = {} as any;
    group.docs.forEach((doc: any) => {
      linksEntity[doc.id] = { id: doc.id, ...doc.data() };
    });
    return linksEntity;
}

  updateLink = async (id: string, payload: any) => {
    return await this.parentCollection.doc('vKSxuxuYWCfNl2JvwwTEUv717nD3').collection('links').doc(id).update(payload);
  };

  updateOrder = (links: any) => {
    links.forEach((link: any, index: number) => this.updateLink(link.id, { order: index }));
  };

  addNewLink = (link: any) => {
    return this.parentCollection.doc('vKSxuxuYWCfNl2JvwwTEUv717nD3').collection('links').add(link).then((doc:any) => {
      this.updateLink(doc.id, { id: doc.id})
      return doc;
    });
  };

  deleteLink = (id: string) => {
    return this.parentCollection.doc('vKSxuxuYWCfNl2JvwwTEUv717nD3').collection('links').doc(id).delete();
  };
}
