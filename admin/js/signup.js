(() => {
    // ユーザープールの設定
    const poolData = {
      UserPoolId: "ap-northeast-1_oknRjJG58",
      ClientId: "1je4f2vsoaem1254cgsq1cc782"
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
    const attributeList = [];
  
    // Amazon Cognito 認証情報プロバイダーを初期化します
    AWS.config.region = "ap-northeast-1"; // リージョン
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-1:06a3362c-e9ac-45ce-91c7-03384ad3cfc6"
    });
  
    // 「Create Account」ボタン押下時
    const createAccountBtn = document.getElementById("createAccount");
    createAccountBtn.addEventListener("click", () => {
      /**
       * サインアップ処理。
       */
      const username = document.getElementById("email").value;
      const name = document.getElementById("name").value;
      const password = document.getElementById('password').value;
  
      // 何か1つでも未入力の項目がある場合、処理終了
      const message = document.getElementById("message-span");
      if (!username | !name | !password) {
        message.innerHTML = "未入力項目があります。";
        return false;
      }
  
      // ユーザ属性リストの生成
      const dataName = {
        Name: "name",
        Value: name
      };
      
      const attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataName
      );
      
      attributeList.push(attributeName);

      console.log(username);
      console.log(name);
      console.log(password);
  
      // サインアップ処理
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          message.innerHTML = err.message;
          return;
        } else {
          // サインアップ成功の場合、アクティベーション画面に遷移する
          alert(
            "We sent you an verification to your registered email address."
          );
          location.href = "signin.html";
        }
      });
    });
  })();
  