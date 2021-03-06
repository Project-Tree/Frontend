import { useEffect, useState } from 'react';
import { create, IPFSHTTPClient } from 'ipfs-http-client';

const InfuraURL = 'https://ipfs.infura.io:5001/api/v0';
const LocalURL = 'http://127.0.0.1:5001/api/v0';

const useIPFS = (url = InfuraURL): [IPFSHTTPClient] => {
  const [ipfs, setIPFS] = useState<IPFSHTTPClient>(null);

  useEffect(() => {
    function init() {
      if (ipfs) return

      const node = create({url: url})
      setIPFS(node)
    }

    init()
  }, [ipfs]);

  return [ipfs];
};

export default useIPFS;
