function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
	var Minio = require('minio')
	
    console.log("Instantiate the minio client")
	var minioClient = new Minio.Client({
        endPoint: '127.0.0.1',
        port: 5080,
        useSSL: false,
        accessKey: '0x9c784fD443Faf95D25F1598F7D2ece581CeA2DEe',
        secretKey: 'memoriae'
	});


	// File that needs to be uploaded.
	var file = 'c:/Recovery.txt'

	console.log("create bucket.")

	var bucketName='bucketjs13'
	minioClient.makeBucket(bucketName, 'us-east-1', async function(err) {
		if (err) return console.log(err)
		console.log('Bucket created successfully in "us-east-1".')

		var metaData = {
			'Content-Type': 'application/octet-stream',
			'X-Amz-Meta-Testing': 1234,
			'example': 5678
		}
		
		console.log("wait 30 sec for bucket confirm")
		await sleep(30000);
		
		console.log("put object")
		minioClient.fPutObject(bucketName, 'obj1', file, metaData, function(err, etag) {
		  if (err) return console.log(err)
		  console.log('File uploaded successfully.')
		});
	});
}

demo();