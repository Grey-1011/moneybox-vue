import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
    'tag name duplicated': '标签名重复了'
};
@Component
export class TagHelper extends Vue {
    createTag() {
        return new Promise((() => {
            this.$msgbox.prompt('请输入标签名', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '标签名不能为空',
                inputValidator: v => !!v,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        if (instance.inputValue) {
                            const name = instance.inputValue;
                            this.$store.commit('createTag', name);
                            // resolve()
                            done();
                        }
                    } else {
                        done();
                    }
                },
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        }));
    }
}

export default TagHelper;