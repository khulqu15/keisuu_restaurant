(() => {
    // ユーザープールの設定
    const poolData = {
      UserPoolId: "ap-northeast-1_oknRjJG58",
      ClientId: "1je4f2vsoaem1254cgsq1cc782"
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser(); // 現在のユーザー
  
    const currentUserData = {}; // ユーザーの属性情報
  
    // Amazon Cognito 認証情報プロバイダーを初期化します
    AWS.config.region = "ap-northeast-1"; // リージョン
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-1:06a3362c-e9ac-45ce-91c7-03384ad3cfc6"
    });
  
    // 現在のユーザーの属性情報を取得・表示する
    // 現在のユーザー情報が取得できているか？
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          alert(err);
          location.href = "signin.html";
        } else {
          // ユーザの属性を取得
          cognitoUser.getUserAttributes((err, result) => {
            if (err) {
              alert(err);
              location.href = "signin.html";
            }
  
            // 取得した属性情報を連想配列に格納
            for (i = 0; i < result.length; i++) {
              currentUserData[result[i].getName()] = result[i].getValue();
            }
            document.getElementById("name").innerHTML =
              "ようこそ！" + currentUserData["name"] + "さん";
            document.getElementById("role").innerHTML =
              "Your Role is " + currentUserData["custom:role"];
            document.getElementById("email").innerHTML =
              "Your E-Mail is " + currentUserData["email"];
  
            // サインアウト処理
            const signoutButton = document.getElementById("signout");
            signoutButton.addEventListener("click", event => {
              cognitoUser.signOut();
              location.reload();
            });
            signoutButton.hidden = false;
            console.log(currentUserData);
          });
        }
      });
    } else {
      location.href = "signin.html";
      console.log("Null");
    }
  })();
  